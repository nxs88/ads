export interface AdAccount {
  id: string;
  name: string;
  platform: 'Google' | 'Meta' | 'Yandex';
  connected: boolean;
}
