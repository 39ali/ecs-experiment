import {
  Actions,
  IRuntimeWorld,
  ReadEntity,
  ReadResource,
  Write,
  WriteResource,
  createSystem,
  getEntity,
  queryComponents,
  queryEntities,
} from "sim-ecs";

export enum EasingFunction {
  QuadraticIn,
  BounceOut,
}

export class AnimateComponent {
  public sequences: Seq[] = [];

  public add(seq: Seq) {
    this.sequences.push(seq);
    return this;
  }

  public addTween(t: Tween) {
    this.sequences.push(new Seq().then(t));
    return this;
  }
}

export class TweenTarget<T, J> {
  public ty: any;
  //TODO : see if you can get className from T instead of constrctor
  constructor(public start: J, public end: J, className: any) {
    this.ty = className;
  }
  public lerp(target: T, r: number) {
    //@ts-ignore
    return this.start + (this.end - this.start) * r;
    // target = v;
  }
}

// animation sys
export class Tween {
  public startAbs: number = 0;
  constructor(
    public ease: EasingFunction,
    public duration: number,
    public target: TweenTarget<any, any>
  ) {}

  public then(tween: Tween) {
    const seq = new Seq();
    seq.then(this);
    seq.then(tween);
    return seq;
  }
  public then_delay(duration: number) {
    const seq = new Seq();
    seq.then(this);
    seq.then_delay(duration);
    return seq;
  }
}

export class Seq {
  public tweens: Tween[] = [];
  constructor() {}
  then(tween: Tween) {
    const startTime = this.tweens[this.tweens.length - 1]
      ? this.tweens[this.tweens.length - 1].startAbs +
        this.tweens[this.tweens.length - 1].duration
      : 0;

    tween.startAbs = startTime;
    this.tweens.push(tween);
    return this;
  }
  then_delay(duration: number) {
    const startTime = this.tweens[this.tweens.length - 1]
      ? this.tweens[this.tweens.length - 1].startAbs +
        this.tweens[this.tweens.length - 1].duration
      : 0;

    const delay = new Delay(duration);
    delay.startAbs = startTime;
    this.tweens.push(delay);
    return this;
  }
}

export class Delay extends Tween {
  constructor(public duration: number) {
    super(EasingFunction.QuadraticIn, duration, undefined as any);
  }
}

enum AnimationSystemState {
  Play,
  Pause,
  Reset,
  GoToTimeWithUpdate,
  GoToTimeWithoutUpdate,
}

export class AnimationSystemInfo {
  constructor(
    public lastTime = 0,
    public currentTime = 0,
    public state: AnimationSystemState = AnimationSystemState.Play,
    public dt: number = 0,
    public totalTime: number = 0,
    public needsUpdate: boolean = true
  ) {}
}

export const AnimationControllerSystem = createSystem({
  // The Actions interface allows access to world-operations, like adding entities or changing the state
  actions: Actions,

  animationInfo: WriteResource(AnimationSystemInfo),
  query: queryComponents({
    anim: Write(AnimateComponent),
    entity: ReadEntity(),
  }),
})
  .withName("AnimationControllerSystem")
  .withSetupFunction(({ actions, query, animationInfo }) => {
    const button = document.getElementById("button") as HTMLElement;
    button.addEventListener("click", () => {
      switch (animationInfo.state) {
        case AnimationSystemState.Play: {
          animationInfo.state = AnimationSystemState.Pause;
          button.innerHTML = "PAUSE";
          break;
        }
        case AnimationSystemState.Pause: {
          animationInfo.state = AnimationSystemState.Play;
          button.innerHTML = "Play";
          break;
        }
      }
    });

    const button_reset = document.getElementById("reset") as HTMLElement;
    button_reset.addEventListener("click", () => {
      animationInfo.state = AnimationSystemState.Reset;
      animationInfo.currentTime = 0;
      button.innerHTML = "Play";
    });

    const time_input_value = document.getElementById("time") as HTMLElement;
    const button_go_to_time = document.getElementById(
      "gototime"
    ) as HTMLElement;

    button_go_to_time.addEventListener("click", () => {
      animationInfo.state = AnimationSystemState.GoToTimeWithoutUpdate;
      animationInfo.currentTime = parseInt((time_input_value as any).value);
      button.innerHTML = "Pause";
    });

    const button_go_to_time_update = document.getElementById(
      "gototimeupdate"
    ) as HTMLElement;

    button_go_to_time_update.addEventListener("click", () => {
      animationInfo.state = AnimationSystemState.GoToTimeWithUpdate;
      animationInfo.lastTime = animationInfo.currentTime + 0;
      animationInfo.currentTime = parseInt((time_input_value as any).value);
      button.innerHTML = "Play";
    });
  })
  .withRunFunction(({ actions, query, animationInfo }) => {
    if (animationInfo.needsUpdate) {
      animationInfo.needsUpdate = false;
      updateTotalTime(query, animationInfo);
    }

    (document.getElementById("currentTime") as HTMLElement).innerHTML =
      "Time:" + Math.round(animationInfo.currentTime);
    console.log("animationInfo.currentTime", animationInfo.currentTime);
  })
  .build();

export const AnimationSystem = createSystem({
  actions: Actions,

  animationInfo: WriteResource(AnimationSystemInfo),
  query: queryComponents({
    anim: Write(AnimateComponent),
    entity: ReadEntity(),
  }),
})
  .withName("AnimationSystem")
  .withSetupFunction(({ actions, query, animationInfo }) => {})
  .withRunFunction(({ actions, query, animationInfo }) => {
    if (animationInfo.state === AnimationSystemState.GoToTimeWithUpdate) {
      for (const ent of query.iter()) {
        for (const seq of ent.anim.sequences) {
          for (const tween of seq.tweens) {
            if (
              tween.startAbs <= animationInfo.currentTime &&
              tween.startAbs + tween.duration <= animationInfo.currentTime
            ) {
              // it's a delay
              if (!tween.target) {
                continue;
              }
              const animatableComp = ent.entity.getComponent(tween.target.ty);
              if (!animatableComp) {
                console.error("component not found!");
                continue;
              }

              tween.target.lerp(animatableComp, 1.0);
            }
          }
        }
      }
      animationInfo.state = AnimationSystemState.Pause;
    }

    if (animationInfo.state === AnimationSystemState.Reset) {
      for (const ent of query.iter()) {
        for (const seq of ent.anim.sequences) {
          for (let i = seq.tweens.length - 1; i > -1; i--) {
            const tween = seq.tweens[i];
            // it's a delay
            if (!tween.target) {
              continue;
            }
            const animatableComp = ent.entity.getComponent(tween.target.ty);
            if (!animatableComp) {
              console.error("component not found!");
              continue;
            }

            tween.target.lerp(animatableComp, 0);
          }
        }
      }
      animationInfo.state = AnimationSystemState.Pause;
    }

    if (animationInfo.state === AnimationSystemState.GoToTimeWithoutUpdate) {
      for (const ent of query.iter()) {
        for (const seq of ent.anim.sequences) {
          for (const tween of seq.tweens) {
            if (
              tween.startAbs <= animationInfo.currentTime &&
              tween.startAbs + tween.duration >= animationInfo.currentTime
            ) {
              // it's a delay
              if (!tween.target) {
                continue;
              }
              const animatableComp = ent.entity.getComponent(tween.target.ty);
              if (!animatableComp) {
                console.error("component not found!");
                continue;
              }

              // calc ratio
              const end = tween.startAbs + tween.duration;
              const r =
                (animationInfo.currentTime - tween.startAbs) /
                (end - tween.startAbs);
              const ratio = easingFunctionToRatio(tween.ease, r);
              // console.log("ratio", r, ratio);
              tween.target.lerp(animatableComp, ratio);
              break;
            }
          }
        }
      }
      animationInfo.state = AnimationSystemState.Pause;
    }

    if (animationInfo.state === AnimationSystemState.Pause) {
      return;
    }

    if (
      animationInfo.currentTime < 0 ||
      animationInfo.currentTime > animationInfo.totalTime
    ) {
      return;
    }

    //play
    for (const ent of query.iter()) {
      for (const seq of ent.anim.sequences) {
        for (const tween of seq.tweens) {
          if (
            tween.startAbs <= animationInfo.currentTime &&
            tween.startAbs + tween.duration >= animationInfo.currentTime
          ) {
            // it's a delay
            if (!tween.target) {
              continue;
            }
            const animatableComp = ent.entity.getComponent(tween.target.ty);
            if (!animatableComp) {
              console.error("component not found!");
              continue;
            }

            // calc ratio
            const end = tween.startAbs + tween.duration;
            const r =
              (animationInfo.currentTime - tween.startAbs) /
              (end - tween.startAbs);
            const ratio = easingFunctionToRatio(tween.ease, r);
            // console.log("ratio", r, ratio);
            tween.target.lerp(animatableComp, ratio);
            break;
          }
        }
      }
    }

    animationInfo.currentTime += animationInfo.dt;
  })
  .build();

const updateTotalTime = (query: any, animationInfo: any) => {
  let totalTime = 0;
  for (const ent of query.iter()) {
    for (const seq of ent.anim.sequences) {
      for (const tween of seq.tweens) {
        totalTime = Math.max(totalTime, tween.startAbs + tween.duration);
      }
    }
  }
  animationInfo.totalTime = totalTime;
};

////////////////
const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const easingFunctionToRatio = (func: EasingFunction, val: number) => {
  switch (func) {
    case EasingFunction.QuadraticIn: {
      const v1 = clamp(val, 0.0, 1.0);
      return v1 * v1;
    }

    case EasingFunction.BounceOut: {
      let p = clamp(val, 0.0, 1.0);
      if (p < 4.0 / 11.0) {
        return (121.0 * p * p) / 16.0;
      } else if (p < 8.0 / 11.0) {
        return (363.0 / 40.0) * p * p - (99.0 / 10.0) * p + 17.0 / 5.0;
      } else if (p < 9.0 / 10.0) {
        return (
          (4356.0 / 361.0) * p * p - (35442.0 / 1805.0) * p + 16061.0 / 1805.0
        );
      } else {
        return (54.0 / 5.0) * p * p - (513.0 / 25.0) * p + 268.0 / 25.0;
      }
    }
  }

  console.error("errrrrrrrrrr");
};

let world: IRuntimeWorld;

export function setWorld(wo: IRuntimeWorld) {
  world = wo;
}
