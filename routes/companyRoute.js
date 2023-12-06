// RoleRoute.js
import {
    addCompany,
    getAllCompanies,
    getOneCompany,
    updateCompany,
    deleteCompany,
    getBalance
} from '../Controllers/CompanyController.js';
import { Router } from 'express';
import { verifyadmin ,verifyToken} from '../middelware/auth.js';

const router = Router();

router.post('/company', addCompany);
router.get('/company',getAllCompanies);
router.get('/company/:id', getOneCompany);
router.patch('/company/:id',updateCompany);
router.delete('/company/:id',deleteCompany);
router.get('/balance',getBalance);
export default router;
