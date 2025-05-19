"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bed,
  Bath,
  SquareIcon as SquareFeet,
  MapPin,
  Pencil,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createRequest } from "@/services/TenantService";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import NMContainer from "@/components/ui/core/NMContainer";
import { deleteListing, getSingleListing } from "@/services/PropertyService";

const PropertyDetailPage = ({ params }: { params: { id: string } }) => {
  console.log("params", params);
  const { user } = useUser();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{
    moveInDate: string;
    message: string;
    rentalDuration: string;
  }>();

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const res = await getSingleListing(params.id);
        setProperty(res?.data); // Update this if your API shape is different
      } catch (err) {
        console.error("Error fetching listing", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  console.log(property);

  const handleRequestSubmit = async (formValues: {
    moveInDate: string;
    message: string;
    rentalDuration: string;
  }) => {
    try {
      const payload = {
        rentalHouseId: params.id,
        moveInDate: new Date(formValues.moveInDate).toISOString(), // Ensure the moveInDate is in the correct format
        rentalDuration: formValues.rentalDuration,
        message: formValues.message,
      };

      const res = await createRequest(payload);

      if (res?.success === false) {
        toast.warning(res.message || "Something went wrong.");
        return;
      }

      setRequestSent(true);
      setRequestModalOpen(false);
      toast.success("Rental request sent!");
    } catch (err: any) {
      const fallbackMessage = "Failed to send request. Please try again.";
      const errorMessage = err?.data?.message || fallbackMessage;
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteListing(id);
      console.log(res);

      if (res?.success) {
        toast.success(res?.message);
        router.push("/landlord/dashboard");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error);
      console.error("Error deleting property:", error);
    }
  };

  if (isLoading || !property) {
    return (
      <NMContainer>
        <p>Loading...</p>
      </NMContainer>
    );
  }

  return (
    <NMContainer>
      <div className="flex flex-col gap-6 my-10">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {user?.role === "landlord" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  router.push(`/landlord/properties/${params.id}/edit`)
                }
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4 cursor-pointer" />
              </Button>
            )}
            <h1 className="text-3xl font-bold tracking-tight">
              {property.title}
            </h1>
          </div>
          {user?.role === "landlord" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/landlord/properties/${params.id}/edit`)
                }
              >
                <Pencil className="h-4 w-4" /> Edit
              </Button>
              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4" /> Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This will permanently delete this property and all its
                      data.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(params.id)}
                    >
                      Delete property
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Images and Tabs */}
          <div className="md:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={property.imageUrls?.[activeImage] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex p-2 gap-2 overflow-x-auto">
                {property.imageUrls?.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-16 w-24 overflow-hidden rounded-md border-2 ${
                      activeImage === index
                        ? "border-teal-600"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>

            <Tabs defaultValue="details" className="mt-6">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              {/* Details Tab */}
              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {property.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs text-muted-foreground">
                          Status
                        </span>
                        <Badge
                          className={
                            property.houseStatus === "available"
                              ? "bg-green-500"
                              : "bg-blue-500"
                          }
                        >
                          {property.houseStatus}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Listed On
                        </span>
                        <p className="text-sm font-medium">
                          {new Date(property.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Property Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Property Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-2xl font-bold">${property.rent}/month</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Plus utilities
                    </p>
                  </div>
                  <div className="flex justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <SquareFeet className="h-4 w-4 text-muted-foreground" />
                      <span>{property.area} sqft</span>
                    </div>
                  </div>
                </div>
                {user?.role === "tenant" &&
                  (property.houseStatus === "rented" ? (
                    <Button disabled className="w-full mt-4 bg-gray-400">
                      Already Rented
                    </Button>
                  ) : requestSent ? (
                    <Button disabled className="w-full mt-4 bg-gray-400">
                      Request Sent
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setRequestModalOpen(true)}
                      className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white"
                    >
                      Request Rental
                    </Button>
                  ))}

                {user === null && (
                  <Button
                    onClick={() => {
                      toast.success("Need to login");
                      router.push("/login");
                    }}
                    className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Request Rental
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Request Modal */}
      <Dialog open={requestModalOpen} onOpenChange={setRequestModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Rental</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(handleRequestSubmit)}
            className="space-y-4"
          >
            <div>
              <Label>Move-in Date</Label>
              <Input
                type="date"
                {...register("moveInDate", { required: true })}
              />
              {errors.moveInDate && (
                <p className="text-sm text-red-500">Move-in date is required</p>
              )}
            </div>
            <div>
              <Label>Rental Duration</Label>
              <Input
                type="text"
                placeholder="e.g., 6 months"
                {...register("rentalDuration", { required: true })}
              />
              {errors.rentalDuration && (
                <p className="text-sm text-red-500">
                  Rental duration is required
                </p>
              )}
            </div>
            <div>
              <Label>Message</Label>
              <Input
                className="my-1"
                type="text"
                placeholder="Message to landlord (minimum 10 words)"
                {...register("message", {
                  required: "Message is required",
                  validate: (value) =>
                    value.trim().split(/\s+/).length >= 10 ||
                    "Message must be at least 10 words",
                })}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </NMContainer>
  );
};

export default PropertyDetailPage;
