"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "../../components/UserContext.js";
import "./style/WeeklyExanList.css";

const exams = [
  {
    id: "WE_14",
    title: "Weekly Exam 14 ( 16-05-2025 ) - Tally + Excel",
    path: "/weeky-exam/WE_14",
  },
  {
    id: "WE_13",
    title: "Weekly Exam 13 ( 16-05-2025 ) - Word + Basic",
    path: "/weeky-exam/WE_13",
  },
  {
    id: "WE_12",
    title: "Weekly Exam 12 ( 16-05-2025 ) - Word + Excel + Basic",
    path: "/weeky-exam/WE_12",
  },
  {
    id: "WE_11",
    title: "Weekly Exam 11 ( 10-05-2025 )",
    path: "/weeky-exam/WE_11",
  },
  {
    id: "WE_10",
    title: "Weekly Exam 10 ( 02-05-2025 )",
    path: "/weeky-exam/WE_10",
  },
  {
    id: "WE_9",
    title: "Weekly Exam 09 ( 02-05-2025 )",
    path: "/weeky-exam/WE_9",
  },
  {
    id: "WE_8",
    title: "Weekly Exam 08 ( 19-04-2025 )",
    path: "/weeky-exam/WE_8",
  },
  {
    id: "WE_7",
    title: "Weekly Exam 07 ( 05-03-2025 )",
    path: "/weeky-exam/WE_7",
  },
  {
    id: "WE_6",
    title: "Weekly Exam 06 ( 29-03-2025 )",
    path: "/weeky-exam/WE_6",
  },
  {
    id: "WE_5",
    title: "Weekly Exam 05 ( 22-03-2025 )",
    path: "/weeky-exam/WE_5",
  },
  {
    id: "WE_4",
    title: "Weekly Exam 04 ( 15-03-2025 )",
    path: "/weeky-exam/WE_4",
  },
  {
    id: "WE_3",
    title: "Weekly Exam 03 ( 08-03-2025 )",
    path: "/weeky-exam/WE_3",
  },
  {
    id: "WE_2",
    title: "Weekly Exam 02 ( 01-03-2025 )",
    path: "/weeky-exam/WE_2",
  },
  {
    id: "WE_1",
    title: "Weekly Exam 01 ( 22-02-2025 )",
    path: "/weeky-exam/WE_1",
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