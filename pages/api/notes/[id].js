import dbConnect from '../../../utils/dbConnect';
import Note from '../../../Models/Note'

dbConnect();

export default async (req, res) => {
 const {
  query: { id },
  method
 } = req;

 switch (method) {
  case 'GET':
   try {
    const note = await Note.findById(id);

    if (!note) {
     return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: note });
   } catch (error) {
    res.status(400).json({ success: false })
   }
   break;
  case 'PUT':
   try {
    const note = await Note.findByIdAndUpdate(id, req.body, {
     new: true,
     runValidators: true
    });

    if (!note) {
     return res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: note });

   } catch (error) {
    res.status(400).json({ success: false })
   }
   break;
  case 'DELETE':
   try {
    const deleteNote = await Note.deleteOne({ _id: id })

    if (!deletedNote) {
     return res.status(400).json({ success: false })
    }
    res.status(200).json({ success: true, data: {} });
   } catch (error) {
    return res.status(400).json({ success: false })
   }
   break;
  default:
   res.status(400).json({ success: false })
   break;

 }

}