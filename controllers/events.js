const Event = require('../models/Events');


//- Create the Calendar Events
const createEvents = async(req, res) => {

    try {

        calendarEvent = new Event( req.body );

        calendarEvent.user = req.uid;
        
        const savedEvent = await calendarEvent.save();
        
        
        res.status(201).json({
        ok: true,
        savedEvent

    })

    } catch (error) {
        
        console.log(error)

        res.status(500).json({
            ok: false,
            msg:'Contact the admin' 
        });

    }

}

//- Get the Calendar Events
const getEvents = async(req, res) => {

    try {
        
        const events = await Event.find()
                                  .populate('user', 'username')
        
        res.status(200).json({
            ok: true,
            events
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Contact the admin' 
        });

    }

}

//- Update the Calendar Events
const updateEvents = async( req, res) => {

    const eventId = req.params.id;

    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId)

        if( !event ) {
            
            return res.status(404).json({
                ok: false,
                msg: 'Event doesnt exists'
            })

        }

        if( event.user.toString() !== uid ) {

            return res.status(401).json({
                ok: false,
                msg: 'This event isnt yours!'
            });

        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new:true } );

        res.status(201).json({
            ok: true,
            updatedEvent
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Contact the admin' 
        });

    }


}

//- Delete the Calendar Events
const deleteEvents = async( req, res) => {

    const eventId = req.params.id;

    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId)

        if( !event ) {
            
            return res.status(404).json({
                ok: false,
                msg: 'Event doesnt exists'
            })

        }

        if( event.user.toString() !== uid ) {

            return res.status(401).json({
                ok: false,
                msg: 'This event isnt yours!'
            });

        }

        const deletedEvent = await Event.findByIdAndDelete( eventId );



        res.status(202).json({
            ok: true,
            [deletedEvent.title]: "Deleted"
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Contact the admin' 
        });

    }

}


module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}