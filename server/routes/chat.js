const router = require("express").Router();
const Conversation = require("../models/Conversation");

router.post("/", (req, res) => {
  const { participants } = req.body;
  Conversation.find({ "participants": { "$all": participants } })
    .then(match => {
      if (!match.length) {
        const newConv = new Conversation({
          participants
        });
        newConv.save().then(conv => res.json(conv))
      } else {
        res.json(match[0])
      }
    }).catch(err => console.log(err))
});

router.post('/:id/new-message', (req, res) => {
  const { id } = req.params;
  const { messageData } = req.body;

  Conversation.findByIdAndUpdate(id,
    {
      $push: { 'messages': messageData }
    },
    {
      new: true
    }
  ).then(updatedConversation => {
    res.json(updatedConversation)
  }).catch(err => console.log(err))
})
// router.post("/:id/new-message", (req, res) => {
//   const { id } = req.params
//   const { sendBy, newMessage } = req.body;
//   Conversation.findByIdAndUpdate(id,
//     {
//       $push: {
//         messages: { sendby: sendBy, newMessage }
//       }
//     },
//     {
//       new: true
//     }
//   ).then((newMessage) => res.status(200).json(newMessage))
//     .catch((error) => res.status(500).json(error));
// });

module.exports = router;
