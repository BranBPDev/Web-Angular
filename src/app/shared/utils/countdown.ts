import { computed, signal } from '@angular/core';

/** Cuenta atrás reutilizable basada en signals (p. ej. espera para reenviar un código). */
export class Countdown {
  readonly remaining = signal(0);
  readonly active = computed(() => this.remaining() > 0);

  private timer?: ReturnType<typeof setInterval>;

  start(seconds: number): void {
    this.stop();
    this.remaining.set(seconds);
    this.timer = setInterval(() => {
      this.remaining.update((value) => Math.max(0, value - 1));
      if (this.remaining() === 0) this.stop();
    }, 1000);
  }

  stop(): void {
    clearInterval(this.timer);
    this.timer = undefined;
  }
}
