import { Component, computed, input } from '@angular/core';
import { Experience } from '../../../models/experience.model';
import { formatPeriod } from '../../../utils/date-format';

/**
 * Una experiencia: descripción a un lado e imagen al otro (se invierten con `reversed`).
 * Título centrado sobre la descripción, fechas alineadas a la derecha y texto justificado.
 */
@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.html',
})
export class ExperienceItem {
  readonly item = input.required<Experience>();
  readonly reversed = input<boolean>(false);

  protected readonly period = computed(() => formatPeriod(this.item().startDate, this.item().endDate, this.item().datePrecision));
  protected readonly subtitle = computed(() => [this.item().role, this.item().location].filter(Boolean).join(' · '));
}
