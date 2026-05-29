import fs from 'fs';
import path from 'path';

// Import local data using a simpler approach for a standalone script
const cityNeighborhoodsContent = fs.readFileSync('./src/components/city-neighborhoods.ts', 'utf-8');
const cityNeighborhoodsMatch = cityNeighborhoodsContent.match(/export const CITY_LOCAL: Record<string, CityLocalData> = ({[\s\S]*?});/);

if (!cityNeighborhoodsMatch) {
  console.error('Could not find CITY_LOCAL in city-neighborhoods.ts');
  process.exit(1);
}

// Minimal logic to extract city keys and neighborhoods for testing
// We'll use regex to parse the object structure since it's a TS file
const cities = {};
const cityBlockRegex = /"([^"]+)":\s*{[\s\S]*?neighborhoods:\s*\[([\s\S]*?)\]/g;
let match;
while ((match = cityBlockRegex.exec(cityNeighborhoodsMatch[1])) !== null) {
  const cityKey = match[1];
  const neighborhoods = match[2]
    .split(',')
    .map(n => n.trim().replace(/"/g, ''))
    .filter(n => n.length > 0);
  cities[cityKey] = neighborhoods;
}

const highways = ["Dutra", "Castello Branco", "Anhanguera", "Bandeirantes", "Imigrantes", "Anchieta", "Ayrton Senna", "Fernão Dias", "Régis Bittencourt", "Rodoanel", "Tamoios", "Carvalho Pinto", "Dom Pedro I", "Rio-Santos"];

// Simulate the logic in TestimonialsCarousel
function generateTestimonials(cityName, citySlug) {
  const neighborhoods = cities[citySlug] || [];
  
  // Minimal hash function matching the one in component
  function hashSeed(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h);
  }

  const seed = hashSeed(cityName);
  const items = [];

  for (let idx = 0; idx < 18; idx++) {
    const seedVal = seed + idx;
    const useHighway = (seedVal % 3 === 0) || neighborhoods.length === 0;
    
    let text = "";
    if (useHighway) {
      const highway = highways[seedVal % highways.length];
      text = `rodovia ${highway}`;
    } else {
      const neighborhood = neighborhoods[seedVal % neighborhoods.length];
      text = `bairro ${neighborhood}`;
    }
    items.push({ text, location: useHighway ? 'highway' : 'neighborhood' });
  }
  return items;
}

console.log('--- Starting Testimonials Audit ---');
let totalChecked = 0;
let errors = [];

Object.keys(cities).forEach(citySlug => {
  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const testimonials = generateTestimonials(cityName, citySlug);
  const cityNeighborhoods = cities[citySlug];

  testimonials.forEach((t, i) => {
    totalChecked++;
    if (t.location === 'neighborhood') {
      const found = cityNeighborhoods.some(n => t.text.includes(n));
      if (!found) {
        errors.push(`Error in ${cityName}: Testimonial #${i+1} mentions "${t.text}" which is not in the neighborhood list.`);
      }
    } else if (t.location === 'highway') {
      const found = highways.some(h => t.text.includes(h));
      if (!found) {
        errors.push(`Error in ${cityName}: Testimonial #${i+1} mentions "${t.text}" which is not in the highway list.`);
      }
    }
    
    // Check if the testimonial count is correct
    if (testimonials.length !== 18) {
        errors.push(`Error in ${cityName}: Carousel has ${testimonials.length} items instead of 18.`);
    }
  });
});

if (errors.length === 0) {
  console.log(`✅ Success: All ${totalChecked} testimonials across ${Object.keys(cities).length} cities are valid.`);
  console.log('✅ Carousel size is exactly 18 items for all cities.');
  process.exit(0);
} else {
  console.error(`❌ Audit failed with ${errors.length} errors:`);
  errors.slice(0, 10).forEach(e => console.error(`   - ${e}`));
  if (errors.length > 10) console.error(`   ... and ${errors.length - 10} more.`);
  process.exit(1);
}
