// TransactionController.js
import { db } from "../Models/index.js";
const Transaction = db.Transactions;
import { Sequelize } from "sequelize";


const addTransaction= async (req, res) => {
    let info = {
        amount: req.body.amount,
        data: req.body.data,
        description: req.body.description,
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        transaction_type: req.body.transaction_type
    };
    
    try {
        const transaction = await Transaction.create(info)
        res.status(200).send(transaction)
        }

        catch (error) {
            console.error("Error creating Transaction:", error);
            res.status(500).send("Internal Server Error");
        }   
    };    




// 2. Get all Transactions
const getAllTransaction = async (req, res) => {
    try {
        // Fetch all transactions
        let transactions = await Transaction.findAll({
            include: [
                { model: db.Users, as: "user" },
                { model: db.Categories, as: "category" },
            ],
        });

        // Check if there are no Transactions
        if (transactions.length === 0) {
            res.status(404).send({ message: "No transactions in the database" });
            return;
        }

        res.status(200).send(transactions);
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send(error.message);
    }
};

// 3. Get single Transactions
const getOneTransaction = async (req, res) => {
    let id = req.params.id;
    try {
        let transaction = await Transaction.findOne({
            where: { id: id },
            include: [
                { model: db.Users, as: "user" },
                { model: db.Categories, as: "category" },
            ],
        });

        if (!transaction) {
            res.status(404).send({ message: "Transaction not found" });
            return;
        }

        res.status(200).send(transaction);
    } catch (error) {
        console.error("Error fetching transaction:", error);
        res.status(500).send(error.message);
    }
};
// 4. Update Transactions
const updateTransaction = async (req, res) => {
    let id = req.params.id;
    const transaction = await Transaction.update(req.body, {where: { id: id } });
    res.status(200).send(transaction);
}

// 5. Delete Transactions
const deleteTransaction = async (req, res) => {
    let id = req.params.id;
    await Transaction.destroy({ where: { id: id } });
    res.status(200).send('User deleted');
}



const countTransactionByCategory = async (req, res) => {
    try {
        const { category } = req.body; 

        if (!category) {
            return res.status(400).json({ error: 'Category is required.' });
        }

    
        const transactionCount = await Transaction.count({
           
            where: {
                category_id: {
                    [Sequelize.Op.eq]: category,
                },
            },
        });

    
        res.json({ count: transactionCount });
    } catch (error) {
        console.error('Error counting transactions by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export {
    addTransaction,
    getAllTransaction,
    getOneTransaction,
    updateTransaction,
    deleteTransaction,
    countTransactionByCategory
};
