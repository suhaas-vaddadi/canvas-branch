export type Course = {
  id: number;
  sis_course_id?: string | null;
  uuid: string;
  integration_id?: string | null;
  sis_import_id?: number | null;
  name: string;
  course_code: string;
  original_name?: string | null;
  workflow_state: "unpublished" | "available" | "completed" | "deleted";
  account_id: number;
  root_account_id: number;
  enrollment_term_id: number;
  grading_periods?: any | null;
  grading_standard_id?: number | null;
  grade_passback_setting: string;
  created_at: string;
  start_at?: string | null;
  end_at?: string | null;
  locale?: string | null;
  enrollments?: any | null;
  total_students?: number;
  calendar?: any | null;
  default_view:
    | "feed"
    | "wiki"
    | "modules"
    | "assignments"
    | "syllabus"
    | string;
  syllabus_body?: string | null;
  needs_grading_count?: number;
  term?: any | null;
  course_progress?: any | null;
  apply_assignment_group_weights: boolean;
  permissions?: {
    create_discussion_topic?: boolean;
    create_announcement?: boolean;
    [key: string]: boolean | undefined;
  };
  is_public: boolean;
  is_public_to_auth_users: boolean;
  public_syllabus: boolean;
  public_syllabus_to_auth: boolean;
  public_description?: string | null;
  storage_quota_mb: number;
  storage_quota_used_mb: number;
  hide_final_grades: boolean;
  license?: string | null;
  allow_student_assignment_edits: boolean;
  allow_wiki_comments: boolean;
  allow_student_forum_attachments: boolean;
  open_enrollment: boolean;
  self_enrollment: boolean;
  restrict_enrollments_to_course_dates: boolean;
  course_format: string;
  access_restricted_by_date: boolean;
  time_zone: string;
  blueprint?: boolean;
  blueprint_restrictions?: {
    content?: boolean;
    points?: boolean;
    due_dates?: boolean;
    availability_dates?: boolean;
    [key: string]: boolean | undefined;
  };
  blueprint_restrictions_by_object_type?: {
    [objectType: string]: {
      content?: boolean;
      points?: boolean;
      [key: string]: boolean | undefined;
    };
  };
  template?: boolean;
};
