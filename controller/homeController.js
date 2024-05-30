import express from 'express';

import HabbitRepository from '../model/repositories/habbitRepository.js';

export default class HomeController {

    constructor() {
        this.habbitRepository = new HabbitRepository();
    }

    getHomePage = async (req, res) => {
        return res.render('homePage', { habit: '', flash: '' })
    }

    getListPage = async (req, res) => {
        const habbitList = await this.habbitRepository.getHobbyList();
        return res.render('list', { habit: habbitList, flash: '' })
    }

    getWeeklyPage = async (req, res) => {
        const id=req.query.id;
        const habit = await this.habbitRepository.getHobby(id);
        var days = [];
        days.push(getD(6));
        days.push(getD(5));
        days.push(getD(4));
        days.push(getD(3));
        days.push(getD(2));
        days.push(getD(1));
        days.push(getD(0));
        return res.render('weekly', { habit: habit, days, flash: '' });
    };

    addHabit = async (req, res) => {
        const { habit, goal } = req.body;
        try {
            const isAdded = await this.habbitRepository.addHabbit(habit, goal);
            if (isAdded) {
                req.flash('success', 'habit added successfully')
                return res.render('homePage', { habit: isAdded, flash: req.flash() })
            }
        } catch (error) {
            console.log(error);

            return res.render('homePage', { flash: req.flash('error', "error ocuured") })

        }

    }

    habitStatus = async (req, res) => {
        try {
            var d = req.query.date;
            var id = req.query.id;
            const habit = await this.habbitRepository.updateHobby(id, d);
            if (habit) {
                req.flash('success', 'Status updated successfully!');
                console.log("status updated");
                return res.redirect('back');
            }

            else {
                return res.redirect('back');
            }
        } catch (err) {
            console.log("Habit status not updated", err);
            res.status(500).send("Error updating habit status");
        }

    }

    deleteHabit = async (req, res) => {
        try {
            const id = req.query.id;
            const isDeleted = await this.habbitRepository.deleteHobby(id);
            if (isDeleted) {
                req.flash('success', 'Deleted successfully!');
                return res.redirect('back');
            }
        } catch (error) {
            console.log(error);
        }


    }

}

function getD(n) {
    let tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - n);
    var newDate = tempDate.toLocaleDateString('pt-br').split('/').reverse().join('-');
    return { date: newDate };
}
