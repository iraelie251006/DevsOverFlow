import QuestionForm from "@/components/form/QuestionForm"

const AskQuestion = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm />
      </div>
      
    </>
  )
}

export default AskQuestion