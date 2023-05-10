import { Actions, ReadEvents, SystemError, createSystem } from "sim-ecs";

export const ErrorHandlerSystem = createSystem({
  actions: Actions,
  errors: ReadEvents(Error),
  systemErrors: ReadEvents(SystemError),
})
  .withName("ErrorHandlerSystem")
  .withRunFunction(({ actions, errors, systemErrors }) => {
    let error;
    let foundError = false;

    for (error of errors.iter()) {
      console.error("HANDLED ERROR!", error);
      foundError = true;
    }

    for (error of systemErrors.iter()) {
      console.error(
        "HANDLED ERROR! System:",
        error.System,
        "; Cause:",
        error.cause
      );
      foundError = true;
    }

    if (foundError) {
      actions.commands.stopRun();
    }
  })
  .build();
