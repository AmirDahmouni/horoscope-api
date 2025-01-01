import { Request, Response, NextFunction } from 'express';

const parseDate = (dateString: string): Date | null => {
  const formats = [
    /^\d{4}-\d{1,2}-\d{1,2}$/, // YYYY-MM-DD
    /^\d{1,2}\/\d{1,2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{1,2}-\d{1,2}-\d{4}$/, // DD-MM-YYYY
  ];

  for (let format of formats) {
    if (format.test(dateString)) {
      return new Date(dateString);
    }
  }

  return null;
};

const validateBirthdate = (req: Request, res: Response, next: NextFunction): any => {
  const { birthdate } = req.query;
  const date = parseDate(birthdate as string);

  if (!date)
    return res.status(400).json({ error: 'Invalid birthdate format.' });

  req.query.birthdate = date.toString()
  next();
};

export default validateBirthdate;