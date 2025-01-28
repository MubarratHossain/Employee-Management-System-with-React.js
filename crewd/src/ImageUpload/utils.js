export const uploadImageToImgBB = async (file) => {
    if (!file) {
        console.error("No file selected");
        return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        // Log the URL and parameters for debugging purposes
        console.log("Uploading to ImgBB with URL:", `https://api.imgbb.com/1/upload?key=3c81232cb4e81b4fc65b85fba23dcb1c`);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=3c81232cb4e81b4fc65b85fba23dcb1c`, {
            method: "POST",
            body: formData,
        });

        // Check the response status
        if (!response.ok) {
            console.error("Failed to upload. Status code:", response.status);
            return null;
        }

        const data = await response.json();
        if (data.success) {
            console.log("Image uploaded successfully:", data.data.url);
            return data.data.url; 
        } else {
            console.error("Image upload failed:", data.error);
            return null;
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;
    }
};
