import { IconName } from '../../components/ui/icon/icon';

export interface Feature {
  icon: IconName;
  heading: string;
  description: string;
}

export const FEATURES: readonly Feature[] = [
  {
    icon: 'shield-check',
    heading: 'Cuenta protegida',
    description: 'Tu contraseña se guarda cifrada con hash y sal, y tu correo está verificado.',
  },
  {
    icon: 'mail',
    heading: 'Correo propio',
    description: 'Dirección con tu dominio, con reenvío automático a tu bandeja de siempre.',
  },
  {
    icon: 'zap',
    heading: 'Rápida y siempre disponible',
    description: 'Web estática servida desde una red global con HTTPS en todo momento.',
  },
  {
    icon: 'globe',
    heading: 'Tu propio dominio',
    description: 'Todo funciona bajo branbp.com, listo para seguir creciendo con nuevas secciones.',
  },
];
