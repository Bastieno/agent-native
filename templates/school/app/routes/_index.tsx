import { useEffect } from "react";
import {
  redirect,
  useLoaderData,
  useNavigate,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "react-router";
import { useRole } from "@/hooks/use-role";
import { DefaultSpinner } from "@agent-native/core/client";
import { Landing } from "@/components/landing/Landing";
import { indexData } from "@/lib/landing.server";
import type { IndexData } from "@/lib/landing.server";

// Signed-out visitors on the shared address get the landing page, rendered
// on the server; everyone else gets the app, as before.
export async function loader({ request }: LoaderFunctionArgs) {
  const data = await indexData(request);
  if ("redirect" in data) throw redirect(data.redirect);
  return data;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data?.mode !== "landing") return [{ title: "School" }];
  const description =
    "Ellai runs a school by asking: setup, timetable, lesson notes, marking and report cards, with staff checking everything before it goes out.";
  return [
    { title: "Ellai: run a school by asking" },
    { name: "description", content: description },
    { property: "og:title", content: "Run a school by asking." },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ];
};

export const handle = {
  publicPage: (data: IndexData | undefined) => data?.mode === "landing",
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  if (data.mode === "landing") {
    return <Landing edition={data.edition} calLink={data.calLink} />;
  }
  return <AppIndex />;
}

function AppIndex() {
  const navigate = useNavigate();
  const { role, isLoading, isAuthenticated, access } = useRole();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (role === "school_admin") {
      navigate("/admin");
    } else if (role === "teacher" || role === "subject_coordinator") {
      navigate("/teacher");
    } else if (role === "student") {
      navigate("/student");
    } else if (access === "setup") {
      // Owner or admin of a school nobody has set up yet
      navigate("/admin");
    } else {
      // Not part of a school, or not given a role in it yet
      navigate("/pending-activation");
    }
  }, [role, isLoading, isAuthenticated, access, navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <DefaultSpinner />
    </div>
  );
}
