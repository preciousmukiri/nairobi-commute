import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Key } from "lucide-react";

interface MapViewProps {
  className?: string;
  showControls?: boolean;
}

const MapView = ({ className = "", showControls = true }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(
    localStorage.getItem("mapbox_token") || ""
  );
  const [tokenInput, setTokenInput] = useState("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleSetToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem("mapbox_token", tokenInput.trim());
      setMapboxToken(tokenInput.trim());
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [36.8219, -1.2921], // Nairobi coordinates
        zoom: 12,
        pitch: 45,
      });

      // Add navigation controls
      if (showControls) {
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          "top-right"
        );

        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
          "top-right"
        );
      }

      map.current.on("load", () => {
        setIsMapLoaded(true);

        // Add traffic simulation layer
        if (map.current) {
          // Simulated traffic data for major Nairobi roads
          const trafficData: GeoJSON.FeatureCollection = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: { congestion: "heavy", name: "Uhuru Highway" },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [36.8165, -1.2921],
                    [36.8265, -1.2871],
                    [36.8365, -1.2821],
                  ],
                },
              },
              {
                type: "Feature",
                properties: { congestion: "moderate", name: "Mombasa Road" },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [36.8319, -1.3021],
                    [36.8419, -1.3121],
                    [36.8519, -1.3221],
                  ],
                },
              },
              {
                type: "Feature",
                properties: { congestion: "clear", name: "Thika Road" },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [36.8419, -1.2621],
                    [36.8519, -1.2521],
                    [36.8619, -1.2421],
                  ],
                },
              },
              {
                type: "Feature",
                properties: { congestion: "heavy", name: "Ngong Road" },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [36.7919, -1.2921],
                    [36.7819, -1.2971],
                    [36.7719, -1.3021],
                  ],
                },
              },
              {
                type: "Feature",
                properties: { congestion: "moderate", name: "Waiyaki Way" },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [36.7919, -1.2721],
                    [36.7719, -1.2681],
                    [36.7519, -1.2641],
                  ],
                },
              },
            ],
          };

          map.current.addSource("traffic", {
            type: "geojson",
            data: trafficData,
          });

          map.current.addLayer({
            id: "traffic-layer",
            type: "line",
            source: "traffic",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": [
                "match",
                ["get", "congestion"],
                "heavy",
                "#ef4444",
                "moderate",
                "#f59e0b",
                "clear",
                "#22c55e",
                "#94a3b8",
              ],
              "line-width": 6,
              "line-opacity": 0.8,
            },
          });

          // Add markers for key locations
          const locations = [
            { name: "CBD", coords: [36.8219, -1.2864] as [number, number], type: "hub" },
            { name: "JKIA", coords: [36.9277, -1.3195] as [number, number], type: "hub" },
            { name: "Westlands", coords: [36.8048, -1.2673] as [number, number], type: "hub" },
            { name: "Karen", coords: [36.7126, -1.3197] as [number, number], type: "hub" },
          ];

          locations.forEach((loc) => {
            const el = document.createElement("div");
            el.className = "w-4 h-4 bg-primary rounded-full border-2 border-primary-foreground shadow-glow cursor-pointer";
            
            new mapboxgl.Marker(el)
              .setLngLat(loc.coords)
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setHTML(
                  `<div class="font-semibold">${loc.name}</div><div class="text-sm text-muted-foreground">Transit Hub</div>`
                )
              )
              .addTo(map.current!);
          });
        }
      });

      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Map initialization error:", error);
    }
  }, [mapboxToken, showControls]);

  if (!mapboxToken) {
    return (
      <div className={`relative rounded-xl overflow-hidden bg-card border border-border ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-secondary rounded-2xl flex items-center justify-center">
              <Key className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Mapbox Token Required</h3>
              <p className="text-muted-foreground text-sm">
                To display the interactive map, please enter your Mapbox public token. 
                Get one free at{" "}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="pk.eyJ1Ijo..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSetToken} variant="hero">
                Set Token
              </Button>
            </div>
            <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg text-left">
              <AlertCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your token is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      <div ref={mapContainer} className="absolute inset-0" />
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-card flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
