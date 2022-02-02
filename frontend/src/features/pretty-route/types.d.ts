type PrettyRouteType = "PROFILE" | "VEIL" | "NOT_FOUND";

interface PrettyRouteResponse {
  type: PrettyRouteType;
  name: string;
  description: string;
}
