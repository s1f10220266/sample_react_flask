from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_openai import ChatOpenAI
import os
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

my_app = Flask(__name__)
CORS(my_app)

#openaiの設定
openai_api_key = os.getenv("OPENAI_API_KEY")
openai_api_base = os.getenv("OPENAI_API_BASE")
llm = ChatOpenAI(api_key=openai_api_key, base_url=openai_api_base, model="gpt-4o-mini", temperature=0)

#プロンプトを作成
system_template = """
ユーザのニックネームは{name}です。
{name}さんと自然な会話を続けてください。

ユーザの会話: {input}
"""

prompt_template = ChatPromptTemplate.from_messages(
    [("system", system_template), ("user", "{input}")]
)

parser = StrOutputParser()

chain = prompt_template | llm | parser

@my_app.route('/api/data', methods=['POST'])
def user_name():
    recv_data = request.get_json()
    name = recv_data.get('name', '') 
    if name:
        send_data = f"こんにちは、{name}さん！ChatGPT-o4 miniへようこそ。"
    else:
        send_data = "名前が入力されていません。ニックネームを教えてください！"
    
    return jsonify({"message": send_data})

@my_app.route('/api/chat', methods=['POST'])
def chat():
    recv_data = request.get_json()
    user_name = recv_data['name']
    input = recv_data['input']
    ans = chain.invoke({"name": user_name, "input": input})
    
    return jsonify({"ans": ans})
    

if __name__ == '__main__':
    my_app.run(debug=True)
