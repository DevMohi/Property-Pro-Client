"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSingleListing, updateListing } from "@/services/PropertyService";
import { toast } from "sonner";

const EditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const id = params.id as string;
  console.log(id);

  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const res = await getSingleListing(id);
        setProperty(res?.data); // Update this if your API shape is different
      } catch (err) {
        console.error("Error fetching listing", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const form = useForm({});

  const {
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title || "",
        location: property.location || "",
        rent: property.rent || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        area: property.area || "",
        description: property.description || "",
      });
    }
  }, [property, form]);

  const onSubmit = async (values: any) => {
    console.log("Form submitted with values:", values);
    try {
      // Create the data object
      const stringifiedValues = Object.fromEntries(
        Object.entries(values)
          .filter(([key]) => key !== "imageUrls") // Remove imageUrls from the request
          .map(([key, value]) => [key, String(value)]) // Ensure all values are strings
      );

      // Wrap the data under the 'data' key as expected by the server
      const data = { data: stringifiedValues };

      // Call the updateListing function with the formatted data
      const res = await updateListing({
        id, // Passing the property id
        data, // Pass the data as a JSON object
      });

      // Handle the response from the update request
      if (res?.success) {
        toast.success(res?.message); // Show success message
        router.push("/landlord/properties"); // Optionally, redirect to properties page after successful update
      } else {
        toast.error(res?.message); // Show error message
      }
    } catch (err: any) {
      console.error("Error during update:", err);
      toast.error("Failed to update listing.");
    }
  };

  if (isLoading || !property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Update</CardTitle>
          <CardDescription>
            Update the details of your property.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Modern Apartment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1500"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bathrooms</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1.5"
                          step="0.5"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (sq ft)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1200"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the property..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <CardFooter className="flex justify-end gap-2 px-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isSubmitting ? "Updating...." : "Update"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPage;
