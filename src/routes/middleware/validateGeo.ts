import { NextFunction } from 'express';
import { query, validationResult } from 'express-validator';
import { Req, Res } from '../common/express-types';

// Validation middleware
const validateGeo = [
  query('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90'),
  query('long')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180'),
  (req: Req, res: Res, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateGeo;
