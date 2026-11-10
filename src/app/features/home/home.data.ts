import { IconName } from '../../shared/components/icon/icon';

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export const FEATURES: readonly Feature[] = [
  {
    icon: 'shield-check',
    title: 'Cuenta protegida',
    description: 'Tu contraseña se guarda cifrada con hash y sal, y tu correo está verificado.',
  },
  {
    icon: 'mail',
    title: 'Correo propio',
    description: 'Dirección con tu dominio, con reenvío automático a tu bandeja de siempre.',
  },
  {
    icon: 'zap',
    title: 'Rápida y siempre disponible',
    description: 'Web estática servida desde una red global con HTTPS en todo momento.',
  },
  {
    icon: 'globe',
    title: 'Tu propio dominio',
    description: 'Todo funciona bajo branbp.com, listo para seguir creciendo con nuevas secciones.',
  },
];
