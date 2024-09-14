"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Star,
  MoreHorizontal,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Menu,
  Trash2,
  Filter,
  Search,
  Plus,
  SortAsc,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AddRestaurantButton } from "./add-restaurant";
import { useRestaurantStore } from "@/lib/store/useRestaurantStore"; // Assuming the store is placed here

export function RestaurantTable() {
  const {
    companyRestaurants,
    fetchCompanyRestaurants,
    setCompanyRestaurants,
    removeRestaurant,
  } = useRestaurantStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "rating">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const restaurantsPerPage = 15;

  useEffect(() => {
    fetchCompanyRestaurants("companyId"); // Pass the correct company ID
  }, []);

  const handleDelete = (id: number) => {
    removeRestaurant(id); // Assume removeRestaurant is implemented in the Zustand store
  };

  const handleViewMenu = (name: string) => {
    console.log(`Viewing menu for ${name}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilter = (cuisine: string) => {
    if (activeFilter === cuisine) {
      setActiveFilter(null);
      fetchCompanyRestaurants("companyId"); // Reset to original state
    } else {
      setActiveFilter(cuisine);
      setCompanyRestaurants(
        companyRestaurants.filter(
          (restaurant) => restaurant.cuisine === cuisine,
        ),
      );
    }
    setCurrentPage(1);
  };

  const handleRemoveFilter = () => {
    setActiveFilter(null);
    fetchCompanyRestaurants("companyId"); // Reset to original state
    setCurrentPage(1);
  };

  const handleSort = (by: "name" | "rating") => {
    setSortBy(by);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredRestaurants = companyRestaurants
    .filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
      }
    });

  const indexOfLastRestaurant = currentPage * restaurantsPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantsPerPage;
  const currentRestaurants = filteredRestaurants.slice(
    indexOfFirstRestaurant,
    indexOfLastRestaurant,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredRestaurants.length / restaurantsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="w-1/3 relative">
          <Input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Filter className="h-4 w-4" />
                {activeFilter && (
                  <span className="absolute -top-1 -left-1 h-3 w-3 bg-primary rounded-full">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </span>
                )}
                <span className="sr-only">Filter restaurants</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none text-center">
                  Filter by Cuisine
                </h4>
                <div className="grid gap-2">
                  {Array.from(
                    new Set(companyRestaurants.map((r) => r.cuisine)),
                  ).map((cuisine) => (
                    <Button
                      key={cuisine}
                      variant="ghost"
                      onClick={() => handleFilter(cuisine)}
                      className="justify-between"
                    >
                      {cuisine}
                      {activeFilter === cuisine && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </Button>
                  ))}
                </div>
                {activeFilter && (
                  <Button
                    variant="destructive"
                    onClick={handleRemoveFilter}
                    className="mt-2"
                  >
                    <X className="mr-2 h-4 w-4" /> Remove Filter
                  </Button>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <SortAsc className="h-4 w-4" />
                {(sortBy !== "name" || sortOrder !== "asc") && (
                  <span className="absolute -top-1 -left-1 h-3 w-3 bg-primary rounded-full">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </span>
                )}
                <span className="sr-only">Sort restaurants</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <h4 className="font-medium leading-none text-center">
                  Sort by
                </h4>
                <div className="grid gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="justify-between"
                  >
                    Name
                    {sortBy === "name" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("rating")}
                    className="justify-between"
                  >
                    Rating
                    {sortBy === "rating" && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <AddRestaurantButton />
        </div>
      </div>

      {activeFilter && (
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary">
            Filtered by: {activeFilter}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFilter}
              className="ml-2 h-4 w-4 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        </div>
      )}

      <Card className="overflow-hidden">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Name</TableHead>
                <TableHead>Cuisine</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRestaurants.map((restaurant) => (
                <motion.tr
                  key={restaurant.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className=" ml-2 bg-foreground">
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          width={40}
                          height={40}
                          className="rounded-lg"
                        />
                      </Avatar>
                      <span className="font-medium">{restaurant.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{restaurant.cuisine}</TableCell>
                  <TableCell>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center"
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          {restaurant.location.length > 20
                            ? `${restaurant.location.substring(0, 20)}...`
                            : restaurant.location}
                        </a>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">
                            {restaurant.name}
                          </h4>
                          <p className="text-sm">{restaurant.location}</p>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="font-semibold">Coordinates:</span>
                            <span className="bg-primary/10 px-2 py-1 rounded-md">
                              {restaurant.latitude.toFixed(4)},{" "}
                              {restaurant.longitude.toFixed(4)}
                            </span>
                          </div>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline inline-flex items-center"
                          >
                            <MapPin className="w-4 h-4 mr-1" />
                            View on Google Maps
                          </a>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(restaurant.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {restaurant.rating.toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">
                            Open menu for {restaurant.name}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() => handleViewMenu(restaurant.name)}
                        >
                          <Menu className="mr-2 h-4 w-4" />
                          <span>View Menu</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleDelete(restaurant.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-center items-center space-x-2">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="outline"
          size="icon"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          size="icon"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
