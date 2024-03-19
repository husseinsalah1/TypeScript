import { Service } from "../base/Service";
import CourseRepository from "./CourseRepository";
import { ICourse } from "./courseModel";

class CourseService extends Service<ICourse> {}

export default new CourseService(CourseRepository);
