import React, { useContext, useEffect, useRef, useState } from "react";
import { LuCamera, LuTrash2, LuUpload } from "react-icons/lu";
import toast from "react-hot-toast";
import CharAvatar from "../../components/Cards/CharAvatar";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const Settings = () => {
    return (
        <DashboardLayout activeMenu="Settings">
            <SettingsForm />
        </DashboardLayout>
    );
};

const SettingsForm = () => {
    const { user, updateUser } = useContext(UserContext);
    const [fullName, setFullName] = useState(user?.fullName || "");
    const [selectedImage, setSelectedImage] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(
        () => () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl);
            }
        },
        [imagePreviewUrl]
    );

    const handleImageChange = (event) => {
        const image = event.target.files?.[0];
        event.target.value = "";

        if (image) {
            setImagePreviewUrl(URL.createObjectURL(image));
            setSelectedImage(image);
            setRemoveImage(false);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setImagePreviewUrl(null);
        setRemoveImage(true);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const trimmedName = fullName.trim();

        if (!trimmedName) {
            toast.error("Name is required");
            return;
        }

        setIsSaving(true);

        try {
            let profileImageUrl = removeImage ? null : user?.profileImageUrl || null;
            if (selectedImage) {
                const uploadResponse = await uploadImage(selectedImage);
                profileImageUrl = uploadResponse.imageUrl;
            }

            const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
                fullName: trimmedName,
                profileImageUrl,
            });

            updateUser(response.data);
            setFullName(response.data.fullName);
            setSelectedImage(null);
            setImagePreviewUrl(null);
            setRemoveImage(false);
            toast.success("Settings saved");
        } catch (error) {
            console.error("Failed to update profile:", error);
            toast.error(error.response?.data?.message || "Could not save settings. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const displayedImage = imagePreviewUrl || (!removeImage ? user?.profileImageUrl : null);

    return (
        <div className="max-w-3xl mx-auto my-8">
            <div className="card">
                <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Update your name and profile picture.
                </p>

                <form onSubmit={handleSave} className="mt-8 space-y-8">
                    <section>
                        <h2 className="text-sm font-medium text-gray-700 mb-4">Profile picture</h2>
                        <div className="flex flex-wrap items-center gap-5">
                            {displayedImage ? (
                                <img
                                    src={displayedImage}
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover bg-gray-100"
                                />
                            ) : (
                                <CharAvatar
                                    fullName={fullName}
                                    width="w-20"
                                    height="h-20"
                                    style="text-xl"
                                />
                            )}

                            <div className="flex flex-wrap gap-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    disabled={isSaving}
                                />
                                <button
                                    type="button"
                                    className="card-btn"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isSaving}
                                >
                                    {displayedImage ? <LuCamera /> : <LuUpload />}
                                    {displayedImage ? "Change picture" : "Upload picture"}
                                </button>
                                {(user?.profileImageUrl || selectedImage) && !removeImage && (
                                    <button
                                        type="button"
                                        className="card-btn text-red-500"
                                        onClick={handleRemoveImage}
                                        disabled={isSaving}
                                    >
                                        <LuTrash2 />
                                        Remove picture
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>

                    <section>
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="input-box">
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                autoComplete="name"
                                maxLength={100}
                                className="w-full bg-transparent outline-none"
                                disabled={isSaving}
                            />
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button type="submit" className="add-btn add-btn-fill" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
