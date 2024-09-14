"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MapPin, Star, Menu, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRestaurantStore } from "@/lib/store/useRestaurantStore"; // Assuming the store is placed here

export function AddRestaurantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [addedRestaurants, setAddedRestaurants] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const { nearbyRestaurants, fetchNearbyRestaurants } = useRestaurantStore();

  useEffect(() => {
    if (isOpen) {
      fetchNearbyRestaurants(); // Pass the correct company ID
    }
  }, [isOpen]);

  const handleAddRestaurant = (restaurantId: string) => {
    if (!addedRestaurants.includes(restaurantId)) {
      setAddedRestaurants([...addedRestaurants, restaurantId]);
    }
  };

  const handleRemoveRestaurant = (restaurantId: string) => {
    setAddedRestaurants(addedRestaurants.filter((id) => id !== restaurantId));
  };

  const handleShowMenu = (restaurantId: string) => {
    setShowMenu(showMenu === restaurantId ? null : restaurantId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="
            relative overflow-hidden bg-gradient-to-r from-pink-500 to-yellow-500 text-white
            transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg
            before:absolute before:inset-0 before:-z-10 before:translate-x-[100%] before:translate-y-[70%] before:rotate-45
            before:bg-white before:opacity-20 before:transition-transform before:duration-1000 before:ease-out
            hover:before:translate-x-[-50%] hover:before:translate-y-[-50%] active:scale-100
            group px-3 py-1 text-sm
          "
        >
          <span className="relative z-10 flex items-center justify-center transition-transform duration-500 ease-in-out ">
            <Plus className="mr-1 transition-transform duration-500 ease-in-out group-hover:rotate-180 w-4 h-4" />
            <span className="font-semibold items-center justify-center ">
              Add Restaurant
            </span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Nearby Restaurant</DialogTitle>
        </DialogHeader>
        {addedRestaurants.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Added Restaurants:</h3>
            <div className="flex flex-wrap gap-2">
              {addedRestaurants.map((restaurantId) => {
                const restaurant = nearbyRestaurants.find(
                  (r) => r._id === restaurantId,
                );
                return (
                  restaurant && (
                    <Badge
                      key={restaurant._id}
                      variant="secondary"
                      className="flex items-center"
                    >
                      {restaurant.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => handleRemoveRestaurant(restaurant._id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
                );
              })}
            </div>
          </div>
        )}
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4 mb-2">
            {nearbyRestaurants.map((restaurant) => (
              <Card
                key={restaurant._id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex justify-between items-start">
                    <span>{restaurant.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {parseFloat(restaurant?.distance).toFixed(1)} km
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {restaurant?.cuisine}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="mr-1 h-4 w-4" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(restaurant?.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {restaurant?.rating?.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddRestaurant(restaurant._id)}
                      disabled={addedRestaurants.includes(restaurant._id)}
                    >
                      {addedRestaurants.includes(restaurant._id)
                        ? "Added"
                        : "Add Restaurant"}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleShowMenu(restaurant._id)}
                    >
                      <Menu className="w-4 h-4 mr-1" />
                      {showMenu === restaurant._id ? "Hide Menu" : "Show Menu"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
