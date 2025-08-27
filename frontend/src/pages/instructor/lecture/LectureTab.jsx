// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Progress } from "@/components/ui/progress";
// import { Switch } from "@/components/ui/switch";
// import { ChevronLeft, Loader2, MinusCircle } from "lucide-react";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LectureTab() {
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("Introduction to Java");
//   const [isPreviewFree, setIsPreviewFree] = useState(true);
//   const [uploadProgress, setUploadProgress] = useState(60);
//   const [mediaProgress, setMediaProgress] = useState(false);

//   // Handlers (static demo only)
//   const fileChangeHandler = (e) => {
//     e.preventDefault();
//     setMediaProgress(true);
//     setTimeout(() => {
//       setUploadProgress(100);
//       setMediaProgress(false);
//     }, 1500);
//   };

//   const editLectureHandler = () => {
//     alert(`Lecture updated!\nTitle: ${title}\nPreview: ${isPreviewFree}`);
//   };

//   const removeLectureHandler = () => {
//     alert("Lecture removed!");
//   };

//   return (
//     <Card>
//       <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//         <div>
//           <CardTitle>Edit Lecture</CardTitle>
//           <CardDescription>
//             Update lecture title, video, or access.
//           </CardDescription>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline" onClick={() => navigate(-1)}>
//             <ChevronLeft />
//             Back
//           </Button>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button variant="destructive" className="cursor-pointer">
//                 Remove <MinusCircle />
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Are you sure?</DialogTitle>
//                 <DialogDescription>
//                   This action cannot be undone. It will permanently remove this
//                   lecture.
//                 </DialogDescription>
//               </DialogHeader>
//               <DialogFooter>
//                 <DialogClose asChild>
//                   <Button variant="outline">Cancel</Button>
//                 </DialogClose>

//                 <DialogClose asChild>
//                   <Button variant="destructive" onClick={removeLectureHandler}>
//                     Yes, delete it
//                   </Button>
//                 </DialogClose>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-6 mt-4">
//         {/* Title */}
//         <div className="space-y-1">
//           <Label htmlFor="title">Lecture Title</Label>
//           <Input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Introduction to Java"
//           />
//         </div>

//         {/* Video Upload */}
//         <div className="space-y-1">
//           <Label htmlFor="video">
//             Upload Video <span className="text-red-600">*</span>
//           </Label>
//           <Input
//             id="video"
//             type="file"
//             accept="video/*"
//             onChange={fileChangeHandler}
//             className="w-fit"
//           />
//         </div>

//         {/* Upload Progress */}
//         {mediaProgress && (
//           <div className="space-y-2">
//             <Progress value={uploadProgress} />
//             <p className="text-sm text-muted-foreground">
//               {uploadProgress}% Uploaded
//             </p>
//           </div>
//         )}

//         {/* Free Preview Toggle */}
//         <div className="flex items-center gap-2">
//           <Switch
//             id="free"
//             checked={isPreviewFree}
//             onCheckedChange={setIsPreviewFree}
//           />
//           <Label htmlFor="free">This lecture is free to preview</Label>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-end">
//           <Button onClick={editLectureHandler} className="cursor-pointer">
//             Update
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// export default LectureTab;
