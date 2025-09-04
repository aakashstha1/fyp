import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, PlaySquare, FileText } from "lucide-react";

function LectureList({
  lectures,
  currentLecture,
  onSelect,
  assignment,
  completedLectures = [],
  assignmentCompleted = false,
}) {
  if (!lectures || lectures.length === 0) return <p>No lectures available</p>;

  const completedSet = new Set(completedLectures.map((lec) => lec._id || lec));
  const completedLecturesCount = lectures.filter((lec) =>
    completedSet.has(lec._id)
  ).length;

  // total items = lectures + assignment (1 if exists)
  const totalItems = lectures.length + (assignment ? 1 : 0);
  const completedItems = completedLecturesCount + (assignmentCompleted ? 1 : 0);

  return (
    <div className="w-full lg:w-1/3 border-r border-gray-400 pt-6 lg:pt-0 lg:pl-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Course Contents</h2>

      {/* Progress Bar */}
      {totalItems > 0 && (
        <div className="px-4 mb-6">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Progress</span>
            <span>
              {completedItems}/{totalItems} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-2 transition-all duration-300"
              style={{ width: `${(completedItems / totalItems) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Lecture Cards */}
      <div className="space-y-4 overflow-y-auto max-h-[60vh] p-4">
        {lectures.map((lecture, index) => {
          const isCompleted = completedSet.has(lecture._id);
          return (
            <Card
              key={lecture._id}
              onClick={() => onSelect(lecture)}
              className={`transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer rounded-xl ${
                lecture._id === currentLecture?._id
                  ? "bg-gray-100"
                  : "dark:bg-gray-800"
              }`}
            >
              <CardContent className="flex justify-between items-center truncate">
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckSquare size={22} className="text-green-500" />
                  ) : (
                    <PlaySquare size={22} className="text-gray-400" />
                  )}
                  <CardTitle className="text-base font-semibold text-gray-700 ">
                    {`Lecture ${index + 1}: ${lecture.lectureTitle}`}
                  </CardTitle>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Assignment Card */}
        {assignment && (
          <Card
            onClick={() => onSelect(assignment)}
            className={`transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer rounded-xl ${
              assignment === currentLecture ? "bg-blue-100" : "bg-blue-50"
            }`}
          >
            <CardContent className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText
                  size={22}
                  className={
                    assignmentCompleted ? "text-green-500" : "text-blue-500"
                  }
                />
                <CardTitle className="text-base font-semibold text-gray-700">
                  {assignment.title || "Assignment"}
                </CardTitle>
              </div>
              {assignmentCompleted && (
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-none text-xs rounded-full py-1 px-3"
                >
                  Completed
                </Badge>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default LectureList;
