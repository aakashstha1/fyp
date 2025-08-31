"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");
  const API_URL = "http://localhost:8000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return toast.error("Message cannot be empty");

    try {
      await axios.post(
        `${API_URL}/feedback`,
        { userId: currentUser._id, message },
        { withCredentials: true }
      );
      toast.success("Feedback submitted successfully!");
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 md:px-20 py-16 transition-colors">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Contact Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-300">
            We'd love to hear from you! Send us a message with your questions,
            feedback, or anything you want to share.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500" />
              <span>E-learning@elearning.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-green-500" />
              <span>+977 980-XXXX-XXX</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-red-500" />
              <span>Ithari, Nepal</span>
            </div>
          </div>

        </div>

        {/* Right Side - Feedback Form */}
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-800">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            
            {/* Logged-in User Info */}
            <div className="mb-4">
              <p>
                <strong>Name:</strong> {currentUser?.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser?.email}
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Textarea
                placeholder="Your message..."
                rows={6}
                className="bg-gray-100 dark:bg-gray-700"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" className="w-full py-3 text-lg">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
