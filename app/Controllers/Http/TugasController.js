'use strict'
//reference the Tugas Model
const Tugas = use('App/Models/Tugas')
const { validate } = use('Validator')

class TugasController {
    async index ({ view }) {
        const tugases = await Tugas.all()
        return view.render('tugases.index', { tugases: tugases.toJSON() })
    }

    async store ({ request, response, session }) {
        const validation = await validate(request.all(), {
            title: 'required|min:3|max:255'
        })
        
        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
            return response.redirect('back')
        }

        const tugas = new Tugas()
        tugas.title = request.input('title')
        await tugas.save()

        session.flash({ notification: 'Tugas Tersimpan' })

        return response.redirect('back')
    }

    async destroy ({ params, response, session }) {
        const tugas = await Tugas.find(params.id)
        await tugas.delete()

        session.flash({ notification: 'Tugas dihapus!' })

        return response.redirect('back')
    }

}

module.exports = TugasController
