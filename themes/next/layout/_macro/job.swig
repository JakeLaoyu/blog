<div style="padding: 10px 0; margin: 20px auto; width: 90%; text-align: center;">
  <div>
    {{ theme.job.desc }}
    <a href="mailto:{{ theme.job.email }}">{{ theme.job.email }}</a>
  </div>
  <button id="jobButton" disable="enable" onclick="var qr = document.getElementById('job-QR'); if (qr.style.display === 'none') {qr.style.display='block';} else {qr.style.display='none'}">
    <span>{{ theme.job.button }}</span>
  </button>

  <div id="job-QR" style="display: none;">
    <div id="wechat" style="display: inline-block">
      <img id="wechat_qr" src="{{ theme.job.image }}" alt="{{ theme.job.desc }}"/>
    </div>
  </div>
</div>
