import {
  Actions,
  ReadEntity,
  Write,
  WriteResource,
  createSystem,
  queryComponents,
} from "sim-ecs";
import { AnimateComponent, AnimationSystemInfo } from "./animation";

export class TimeInfo {
  constructor(
    public lastTime: number = 0,
    public requiredElapsed = 1000 / 60 // desired interval)
  ) {}
}

export const TimeSystem = createSystem({
  // The Actions interface allows access to world-operations, like adding entities or changing the state
  actions: Actions,

  animationInfo: WriteResource(AnimationSystemInfo),
  timeInfo: WriteResource(TimeInfo),

  query: queryComponents({
    anim: Write(AnimateComponent),
    entity: ReadEntity(),
  }),
})
  .withName("TimeSystem")
  .withSetupFunction(({ actions, query, animationInfo, timeInfo }) => {
    function loop(now: number) {
      requestAnimationFrame(loop);

      if (!timeInfo.lastTime) {
        timeInfo.lastTime = now;
      }
      var elapsed = now - timeInfo.lastTime;

      if (elapsed > timeInfo.requiredElapsed) {
        timeInfo.lastTime = now;
        animationInfo.dt = elapsed;
      }
    }

    requestAnimationFrame(loop);
  })
  .build();
