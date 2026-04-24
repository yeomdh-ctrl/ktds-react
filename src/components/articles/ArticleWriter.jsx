/** @format */

const Input = ({ id, title, type = "text", ...props }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <input type={type} id={id} {...props} />
    </div>
  );
};

const Textarea = ({ id, title, onChange, value }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>{title}</label>
      <textarea id={id} onChange={onChange} value={value}></textarea>
    </div>
  );
};

const ArticleWriter = ({
  inputData: { subject, membersVO, email, content },
  onSubjectChange,
  onNameChange,
  onEmailChange,
  onContentChange,
  onSaveButtonClick,
  onCancelButtonClick,
}) => {
  return (
    <div className="article-writer">
      <Input
        id="subject"
        title="제목"
        onChange={onSubjectChange}
        value={subject}
      />
      <Input
        id="name"
        title="이름"
        onChange={onNameChange}
        value={membersVO.name}
      />
      <Input id="email" title="이메일" onChange={onEmailChange} value={email} />
      <Textarea
        id="content"
        title="내용"
        onChange={onContentChange}
        value={content}
      />

      <button
        type="button"
        className="positive-button"
        onClick={onSaveButtonClick}
      >
        저장
      </button>
      <button
        type="button"
        className="negative-button"
        onClick={onCancelButtonClick}
      >
        취소
      </button>
    </div>
  );
};
export default ArticleWriter;
