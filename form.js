$(function () {
  const rules = {
    bmeis_teach_gpu: { fixGpu: 1, fixCpu: 8, fixMem: 48, info: "Resource requests are set automatically for this partition." }
  };

  const queue = $("#batch_connect_session_context_queue");
  const gpus  = $("#batch_connect_session_context_num_gpus");
  const cores = $("#batch_connect_session_context_num_cores");
  const mem   = $("#batch_connect_session_context_memory");

  $("<div id='applied-rule-note' style='margin-top:6px;color:#666;display:none;'></div>")
    .insertAfter(gpus);

  function syncPartitionRules() {
    const rule = rules[queue.val()];

    if (rule) {

        if (rule.fixCpu) {
          cores.val(rule.fixCpu).prop("readonly", true).addClass("ood-locked");
        } else {
          cores.prop("readonly", false).removeClass("ood-locked");
        }
        if (rule.fixMem) {
          mem.val(rule.fixMem).prop("readonly", true).addClass("ood-locked");
        } else {
          mem.prop("readonly", false).removeClass("ood-locked");
        }
        if (rule.fixGpu) {
          gpus.val(rule.fixGpu).prop("readonly", true).addClass("ood-locked");
        } else {
          gpus.prop("readonly", false).removeClass("ood-locked");
        }

      $("#applied-rule-note").text(rule.info).show();
    } else {
      cores.prop("readonly", false).removeClass("ood-locked");
      mem.prop("readonly", false).removeClass("ood-locked");
      gpus.prop("readonly", false).removeClass("ood-locked");
      $("#applied-rule-note").hide();
    }
  }

  queue.on("change", syncPartitionRules);
  gpus.on("change input", syncPartitionRules);  // sync rules in case there's a rule that depends on GPU count 
  syncPartitionRules();
});