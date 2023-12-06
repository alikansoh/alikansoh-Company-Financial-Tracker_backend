// RoleRoute.js
import {
    addTransaction,
    getAllTransaction,
    getOneTransaction,
    updateTransaction,
    deleteTransaction,
    countTransactionByCategory
} from '../Controllers/TransactionController.js';
import { Router } from 'express';
import { verifyAccountant, verifyToken } from '../middelware/auth.js';
const router = Router();

router.post('/transaction', verifyAccountant,addTransaction);
router.get('/transaction',verifyToken, getAllTransaction);
router.get('/transaction/:id',verifyToken, getOneTransaction);
router.patch('/transaction/:id',verifyAccountant, updateTransaction);
router.delete('/transaction/:id', verifyAccountant,deleteTransaction);
router.get('/category',countTransactionByCategory)


export default router;
