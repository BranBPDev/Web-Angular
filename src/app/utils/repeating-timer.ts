/** Ejecuta una función cada cierto tiempo. Se puede detener y reiniciar. */
export class RepeatingTimer {
  private handle?: ReturnType<typeof setInterval>;

  constructor(private readonly callback: () => void, private readonly intervalMs: number) {}

  start(): void {
    this.stop();
    this.handle = setInterval(this.callback, this.intervalMs);
  }

  stop(): void {
    clearInterval(this.handle);
    this.handle = undefined;
  }
}
