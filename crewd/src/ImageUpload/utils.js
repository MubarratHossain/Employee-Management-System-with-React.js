export const uploadImageToImgBB = async (file) => {
    if (!file) {
        console.error("No file selected");
        return null;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=f672d40464065dd6ecfec4c17a491399`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
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
