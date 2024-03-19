import { Repository } from "../base/Repository";
import CourseModel, { ICourse } from "./courseModel";

class CourseRepository extends Repository<ICourse> {}

export default new CourseRepository(CourseModel);
