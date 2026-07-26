import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  buildVehicleCityHead,
  loadVehicleCity,
  VehicleCityNotFound,
  VehicleCityPage,
} from "@/components/city-vehicle-page";

export const Route = createFileRoute("/guincho-transporte-de-veiculos-em-{$slug}")({
  loader: ({ params }) => {
    const data = loadVehicleCity("transporte-de-veiculos", params.slug);
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => buildVehicleCityHead(loaderData),
  component: RouteComponent,
  notFoundComponent: VehicleCityNotFound,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  return <VehicleCityPage data={data} />;
}
