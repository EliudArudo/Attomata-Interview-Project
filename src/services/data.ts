const { v4: uuid } = require('uuid');

import { students } from './../mock/data'

export class DataProvider {

    studentID: string = ""

    constructor() { }

    login(studentID: string, password: string): void {
        const index = students.findIndex(student => student.id == studentID && student.password === password)

        if (index >= 0)
            this.studentID = students[index].id
        else
            throw ('Student does not exist')

    }

    signup(name: string, studentID: string, password: string): void {
        const index = students.findIndex(student => student.id == studentID)

        if (index >= 0)
            throw ('Student account already exists')
        else {
            const newStudent =
            {
                id: studentID,
                name,
                course: "Bsc Accounting and Finance",
                stage: "2.1",
                password, // hex this
                transcripts: []
            }

            students.push(newStudent)

            this.studentID = newStudent.id
        }

    }

    private getUpdatedTranscript(transcript: any): any {
        console.log({ transcript })
        const studentIndex = students.findIndex(student => student.id === this.studentID)

        students[studentIndex].transcripts.unshift(transcript)

        let transcripts: Array<any> = []

        for (let i = 0; i < students.length; i++)
            transcripts.push({
                studentID: students[i].id,
                transcriptID: students[i].transcripts[0].id,
                average: students[i].transcripts[0].average
            })

        transcripts.sort((a, b) => b.average - a.average)

        for (let i = 0; i < transcripts.length; i++) {
            const transcript = transcripts[i]

            const studentIndex = students.findIndex(student => student.id === transcript.studentID)
            const transcriptIndex = students[studentIndex].transcripts.findIndex(_transcript => _transcript.id === transcript.transcriptID)

            students[studentIndex].transcripts[transcriptIndex].rank = i + 1
        }

        const transcriptIndex = students[studentIndex].transcripts.findIndex(_transcript => _transcript.id === transcript.id)

        return students[studentIndex].transcripts[transcriptIndex]

    }

    calculateAndStoreTranscript(subjects: Array<any>): any {
        let transcript: any = {
            id: uuid(),
            dateSubmitted: new Date().toISOString(),
            average: 0,
            rank: 0,
        }

        const results = []

        let sum = 0

        for (let i = 0; i < subjects.length; i++) {
            const subject = subjects[i]
            const score = Math.floor((subject.score / subject.maxScore) * 100)

            const result = {
                name: subject.title,
                score
            }

            results.push(result)

            sum += score
        }

        transcript['results'] = results
        const average = Math.ceil(sum / subjects.length)
        transcript.average = average

        const _transcript = this.getUpdatedTranscript(transcript)
        return _transcript
    }

    getCurrentLoggedInStudent(): any {
        const student: any = students.find(_student => _student.id === this.studentID)

        return student
    }

    deleteTranscript(id: string): void {
        const index = students.findIndex(student => student.id === this.studentID)

        students[index].transcripts = students[index].transcripts.filter(transcript => transcript.id !== id)
    }

    deleteAccount(): void {
        students.filter(student => student.id !== this.studentID)
    }

    logout() {
        this.studentID = ''
    }
}

export default new DataProvider()

