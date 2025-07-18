import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EventForm = ({ event, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    price: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // If event is provided (editing mode), populate form data
  useEffect(() => {
    if (event) {
      const formattedDate = event.date
        ? new Date(event.date).toISOString().split("T")[0]
        : "";

      setFormData({
        name: event.name || "",
        description: event.description || "",
        category: event.category || "",
        date: formattedDate,
        venue: event.venue || "",
        price: event.price?.toString() || "",
        imageUrl: event.imageUrl || "",
      });

      if (event.imageUrl) {
        setPreviewUrl(event.imageUrl);
      }
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      // Clear the imageUrl since we'll upload a file instead
      setFormData({ ...formData, imageUrl: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object if we have an image file
    if (imageFile) {
      const submitData = new FormData();

      // Add all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key !== "imageUrl" || formData[key]) {
          // Only add imageUrl if it exists and we're not uploading a file
          submitData.append(key, formData[key]);
        }
      });

      // Add the image file - "image" must match the field name expected by the multer middleware
      submitData.append("image", imageFile);

      console.log("Submitting form with image file:", imageFile.name);
      onSubmit(submitData);
    } else if (formData.imageUrl) {
      // No file upload but we have an image URL
      console.log("Submitting form with image URL:", formData.imageUrl);
      onSubmit(formData);
    } else {
      // Neither file nor URL provided
      alert("Please provide either an image file or image URL");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 dark:text-white">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Event Name
        </label>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full px-2 py-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Category
          </label>
          <Input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Date
          </label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Venue
          </label>
          <Input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Price
          </label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">
          Image
        </label>
        <div className="mt-1 space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
            name="image"
          />

          {!imageFile && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Or provide an image URL
              </label>
              <Input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          )}

          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 dark:text-white mb-1">
                Image Preview:
              </p>
              <img
                src={previewUrl}
                alt="Preview"
                className="h-40 object-cover rounded-md border border-gray-300 dark:border-gray-700"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? "Saving..." : event ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
