const state = {
    Comment: initComment(), //새롭게 등록될 이벤트, 혹은 현재 이벤트.
    AllComments: [], //저장된 일정들을 담는 배열.
    ArticleComments: []
};

//사용되는 동작들
const mutations = {
    //다이얼로그를 열때(이벤트 생성 다이얼로그)
    FIND_ARTICLE_COMMENTS(state, This_articleID){
        state.ArticleComments = state.AllComments.filter(c => c.articleID === This_articleID);
        //console.log(state.AllComments.filter(c => c.articleID === This_articleID));
    },
    FORMAT_ALLCOMMENTS(state){
        state.AllComments = [];
    },
    UPDATE_COMMENT(state, getComment) {
        state.AllComments = state
            .AllComments
            .filter(e => e.id !== getComment.id);
            getComment = makeComment(state, getComment); 
        state
            .AllComments
            .push(getComment);
        state.Comment = initComment();
    },
    ADD_COMMENT(state, getComment) {
        getComment = makeComment(state, getComment);
        state
            .AllComments
            .push(getComment);
        state.ArticleComments.push(getComment);
        state.Comment = initComment();
    },
    ADD_COMMENTS(state, AllComments) {
        state.AllComments = [];
        AllComments.forEach(e => {
            state
                .AllComments
                .push(makeComment(state, e));
        });
    }
};

//비동기 처리들.
const actions = {};


// 백엔드의 관점에서 볼때 time과 date를 나눠서 저장하게 되면 변수도 많아질 뿐더러 굉장히 비효율적일 수 밖에 없다. 저장하는 변수의
// 양을 줄일 수 있다면 줄이는게 맞는것이므로 이렇게 합쳐서 저장한다.
const makeComment = (state ,comment) => {
    return {
        id: state.AllComments.length,   //댓글 고유 id
        articleID: comment.articleID,
        userID: comment.userID, 
        comment: comment.comment,
        startDate: comment.startDate,
        startTime: comment.startTime
        //색은 랜덤으로 지정. 여기서 만약 겹치는 날짜를 가지고 있는 이벤트가 있다면 그 색이 겹치지 않도록 설정하는것도 필요할듯.
    }
};

/*
//이벤트의 양식을 initEvent를 통해 만들어지는 이벤트 양식으로 맞춰준다.
const updateComment = (comment) => {
    //데이터로 이미지를 추가해보는건? https://stackoverflow.com/questions/53412106/linking-to-images-referenced-in-vuex-store-in-vue-js
    return {
        commentID: '',   //댓글 고유 id
        commentUserID: '', 
        commentCOMMENT: ''
    }
}
*/

//이벤트의 형태를 잡아주는 변수.
function initComment() {
    return {
        id: '',   //댓글 고유 id
        articleID: '',
        userID: '', 
        comment: '',
        startDate: '',
        startTime: ''
    }
}

export default {mutations, state, actions};