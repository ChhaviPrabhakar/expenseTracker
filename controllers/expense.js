const Expense = require('../models/expense');
const User = require('../models/user');

exports.addExpense = async (req, res, next) => {
    try {
        const { exAmount, description, category } = req.body;

        if (exAmount == undefined || exAmount.length === 0) {
            return res.status(400).json({ success: false, message: 'Parameters missing!' });
        }
        const newExpense = await req.user.createExpense({ exAmount, description, category });

        const totalExpense = Number(req.user.totalExpenses) + Number(exAmount);
        User.update({ totalExpenses: totalExpense }, { where: { id: req.user.id }});

        res.status(201).json({ newExpense, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

exports.getExpense = async (req, res, next) => {
    try {
        const allExpense = await Expense.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ allExpense, success: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
    }
};

exports.deleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;

        if(expenseId == undefined || expenseId.length === 0) {
            return res.status(400).json({ success: false });
        }

        const numberOfRows = await Expense.destroy({ where: { id: expenseId, userId: req.user.id } });
        if(numberOfRows === 0) {
            return res.status(404).json({success: false, message: 'This Expense doesnt belongs to the user'});
        }
        res.status(200).json({ success: true, message: 'Successfully deleted!' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Failed!' });
    }
}