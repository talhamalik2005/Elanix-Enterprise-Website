import Script from "next/script"

interface LocalBusinessProps {
  name: string
  description: string
  url: string
  telephone: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  images: string[]
  sameAs: string[]
  openingHours: string[]
  priceRange: string
}

export function LocalBusinessJsonLd({
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
  sameAs,
  openingHours,
  priceRange,
}: LocalBusinessProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...geo,
    },
    image: images,
    sameAs,
    openingHoursSpecification: openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.split(" ")[0],
      opens: hours.split(" ")[1].split("-")[0],
      closes: hours.split(" ")[1].split("-")[1],
    })),
    priceRange,
  }

  return (
    <Script id="local-business-jsonld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}

interface ServiceProps {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  serviceType: string
  areaServed: string
  audience: string
}

export function ServiceJsonLd({ name, description, provider, serviceType, areaServed, audience }: ServiceProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      ...provider,
    },
    serviceType,
    areaServed,
    audience: {
      "@type": "Audience",
      audienceType: audience,
    },
  }

  return (
    <Script id="service-jsonld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(jsonLd)}
    </Script>
  )
}
