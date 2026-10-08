// Web önizlemesi için boş reklam modülü (AdMob yalnızca Android/iOS).
export const BANNER_KIMLIGI = '';
export async function reklamlariHazirla(): Promise<boolean> {
  return false;
}
export async function gizlilikSecenegiGerekli(): Promise<boolean> {
  return false;
}
export async function gizlilikSecenekleriniAc(): Promise<void> {}
