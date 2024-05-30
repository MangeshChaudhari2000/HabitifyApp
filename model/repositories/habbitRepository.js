import mongoose from "mongoose";
import { HabbitModel } from "../schemas/habbitSchemas.js";
import mongodb, { ObjectId } from 'mongodb';
export default class HabbitRepository {

    addHabbit = async (habit, goal) => {
        const add = new HabbitModel({ habit: habit, goal: goal });
        const isSaved = await add.save();
        if (isSaved) {
            return add
        }
    }

    getHobbyList = async () => {
        const list = await HabbitModel.find({}).sort({ createdAt: -1 });
        if (list) {
            return list;
        }
    }

    updateHobby = async (id, d) => {
        try {
            const habit = await HabbitModel.findOne({
                _id:new ObjectId(id)
            });

            if (habit) {
                let check = habit.check;
                let found = false;
                let streak = habit.streak;

                check.find((item) => {
                    if (item.date === d) {
                        if (item.status === 'done') {
                            item.status = 'reject';
                            streak--;
                        }
                        else if (item.status === 'reject') {
                            item.status = 'none';

                        }
                        else if (item.status === 'none') {
                            item.status = 'done';
                            streak++;
                        }
                        found = true;
                    }
                })
                if (!found) {
                    check.push({ date: d, status: 'done' });
                    streak++;
                }

                if (streak < 0) {
                    streak = 0;
                }
                habit.streak = streak;
                habit.check = check;
                const isSaved = await habit.save();

                return isSaved;

            }
        } catch (error) {
            console.log(error.message);
        }

    }

    deleteHobby= async(id)=>{
       const isDeleted= await HabbitModel.findByIdAndDelete({_id:new ObjectId(id)});
       return isDeleted
    }

    getHobby=async(id)=>{
        const habit = await HabbitModel.findOne({_id:new ObjectId(id)});
        if (habit) {
            return habit;
        }
    }
}