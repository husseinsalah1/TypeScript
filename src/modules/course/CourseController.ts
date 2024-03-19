import { Controller } from "../base/Controller";
import CourseService from "./CourseService";
import { ICourse } from "./courseModel";

class CourseController extends Controller<ICourse> {}

export default new CourseController(CourseService);
