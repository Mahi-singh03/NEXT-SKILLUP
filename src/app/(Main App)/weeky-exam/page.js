"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../components/UserContext.js";
import "./style/WeeklyExanList.css";

const exams = [
  {
    id: "Weekly Exam 14 ( 16-05-2025 )",
    title: "Tally + Excel ( 16-05-2025 )",
    path: "/exams/weekly-exam/WE_14",
  },
  {
    id: "Weekly Exam 13 ( 16-05-2025 )",
    title: "Word + Basic ( 16-05-2025 )",
    path: "/exams/weekly-exam/WE_13",
  },
  {
    id: "Weekly Exam 12 ( 16-05-2025 )",
    title: "Word + Excel + Basic ( 16-05-2025 )",
    path: "/exams/weekly-exam/WE_12",
  },
  {
    id: "Weekly Exam 11 ( 10-05-2025 )",
    title: "Weekly Exam 11 ( 10-05-2025 )",
    path: "/exams/weekly-exam/WE_11",
  },
  {
    id: "Weekly Exam 10 ( 02-05-2025 )",
    title: "Weekly Exam 10 ( 03-05-2025 )",
    path: "/exams/weekly-exam/WE_10",
  },
  {
    id: "Weekly Exam 09 ( 02-05-2025 )",
    title: "Weekly Exam 09 ( 03-05-2025 )",
    path: "/exams/weekly-exam/WE_9",
  },
  {
    id: "Weekly Exam 08 ( 19-04-2025 )",
    title: "Weekly Exam 08 ( 19-04-2025 )",
    path: "/exams/weekly-exam/WE_8",
  },
  {
    id: "Weekly Exam 07 ( 05-03-2025 )",
    title: "Weekly Exam 07 ( 05-04-2025 )",
    path: "/exams/weekly-exam/WE_7",
  },
  {
    id: "Weekly Exam 06 ( 29-03-2025 )",
    title: "Weekly Exam 06 ( 29-03-2025 )",
    path: "/exams/weekly-exam/WE_6",
  },
  {
    id: "Weekly Exam 05 ( 22-03-2025 )",
    title: "Weekly Exam 05 ( 22-03-2025 )",
    path: "/exams/weekly-exam/WE_5",
  },
  {
    id: "Weekly Exam 04 ( 15-03-2025 )",
    title: "Weekly Exam 04 ( 15-03-2025 )",
    path: "/exams/weekly-exam/WE_4",
  },
  {
    id: "Weekly Exam 03 ( 08-03-2025 )",
    title: "Weekly Exam 03 ( 08-03-2025 )",
    path: "/exams/weekly-exam/WE_3",
  },
  {
    id: "Weekly Exam 02 ( 01-03-2025 )",
    title: "Weekly Exam 02 ( 01-03-2025 )",
    path: "/exams/weekly-exam/WE_2",
  },
  {
    id: "Weekly Exam 01 ( 22-02-2025 )",
    title: "Weekly Exam 01 ( 22-02-2025 )",
    path: "/exams/weekly-exam/WE_1",
  },
];

export default function ExamList() {
  const { isAuthenticated, loading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="exam-list-container">
      <h1 className="main-heading">Available Exams</h1>
      <ul className="exam-list">
        {exams.map((exam) => (
          <li key={exam.id} className="exam-item">
            <Link href={exam.path} className="exam-link">
              {exam.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}