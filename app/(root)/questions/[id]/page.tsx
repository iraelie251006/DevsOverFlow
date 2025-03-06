
const QuestionDetails = async({ params }: RouteParams) => {
    const { id } = await params;
  return (
    <div>
        Question Page: {id}
    </div>
  )
}

export default QuestionDetails