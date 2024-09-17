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
import { Plus, MapPin, Star, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRestaurantStore } from "@/lib/store/useRestaurantStore";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion"; // Import motion from framer-motion

function ConfirmAddRestaurantAlert({
  restaurantName,
  onConfirm,
}: {
  restaurantName: string;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex-1">Add Restaurant</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to add {restaurantName}? Your workers will be
            able to order from this restaurant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onConfirm} variant="default">
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AddRestaurantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [addedRestaurants, setAddedRestaurants] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  const {
    companyRestaurants,
    nearbyRestaurants,
    fetchNearbyRestaurants,
    addCompanyRestaurant,
  } = useRestaurantStore();

  useEffect(() => {
    (async () => {
      if (isOpen) {
        setLoading(true);
        await fetchNearbyRestaurants();
        setAddedRestaurants(companyRestaurants.map((r) => r._id.toString()));
        setLoading(false);
      } else {
        filteredNearbyRestaurants = [];
      }
    })();
  }, [isOpen]);

  useEffect(() => {
    setAddedRestaurants(companyRestaurants.map((r) => r._id.toString()));
    filteredNearbyRestaurants = nearbyRestaurants.filter(
      (restaurant) => !addedRestaurants.includes(restaurant._id.toString()),
    );
  }, [companyRestaurants]);

  const handleAddRestaurant = (restaurant: any) => {
    if (!addedRestaurants.includes(restaurant._id.toString())) {
      setAddedRestaurants([...addedRestaurants, restaurant._id.toString()]);
      addCompanyRestaurant(restaurant);
    }
  };

  const handleShowMenu = (restaurantId: string) => {
    setShowMenu(showMenu === restaurantId ? null : restaurantId);
  };

  const handleConfirmAddRestaurant = (restaurant: any) => {
    handleAddRestaurant(restaurant);
  };

  // Filter out the company restaurants from nearby restaurants
  let filteredNearbyRestaurants = nearbyRestaurants.filter(
    (restaurant) => !addedRestaurants.includes(restaurant._id.toString()),
  );

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-4 mb-2">
            {filteredNearbyRestaurants.map((restaurant) => (
              <motion.div
                key={restaurant._id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Card className="transition-shadow hover:shadow-md">
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
                      <ConfirmAddRestaurantAlert
                        restaurantName={restaurant.name}
                        onConfirm={() => handleConfirmAddRestaurant(restaurant)}
                      />
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleShowMenu(restaurant._id)}
                      >
                        <Menu className="w-4 h-4 mr-1" />
                        {showMenu === restaurant._id
                          ? "Hide Menu"
                          : "Show Menu"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {!!loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="relative">
                {/* Plate */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-yellow-500"></div>
                {/* Food in the center (static) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span role="img" aria-label="food" className="text-2xl">
                    🍔
                  </span>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
