/** Update whatsappUrl when your official chat link is ready. */
export const CONTACT = {
  businessName: 'Facima Enterprises',
  phoneDisplay: '+254 769 692 909',
  phoneLocal: '0769 692 909',
  phoneTel: '+254769692909',
  email: 'sales@facimaenterprices.co.ke',
  address: 'Astrol Petrol Station, Ridgeways, Kiambu Road, Kenya',
  hours: 'Mon–Sat: 8:00am – 6:00pm · Sun: 10:00am – 4:00pm',
  /** Empty string = fall back to wa.me using phoneTel */
  whatsappUrl: '',
  heroImage: '/mock/hero-dealership.jpg',
  heroImageFallback: '/mock/showroom-hero.svg',
} as const

export function whatsappHref(): string {
  if (CONTACT.whatsappUrl.trim()) return CONTACT.whatsappUrl.trim()
  return `https://wa.me/${CONTACT.phoneTel.replace(/\D/g, '')}`
}